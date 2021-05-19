package com.tripntips.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.tripntips.myapp.IntegrationTest;
import com.tripntips.myapp.domain.InfoUser;
import com.tripntips.myapp.domain.User;
import com.tripntips.myapp.repository.InfoUserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link InfoUserResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class InfoUserResourceIT {

    private static final String ENTITY_API_URL = "/api/info-users";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private InfoUserRepository infoUserRepository;

    @Mock
    private InfoUserRepository infoUserRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInfoUserMockMvc;

    private InfoUser infoUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InfoUser createEntity(EntityManager em) {
        InfoUser infoUser = new InfoUser();
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        infoUser.setUser(user);
        return infoUser;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InfoUser createUpdatedEntity(EntityManager em) {
        InfoUser infoUser = new InfoUser();
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        infoUser.setUser(user);
        return infoUser;
    }

    @BeforeEach
    public void initTest() {
        infoUser = createEntity(em);
    }

    @Test
    @Transactional
    void createInfoUser() throws Exception {
        int databaseSizeBeforeCreate = infoUserRepository.findAll().size();
        // Create the InfoUser
        restInfoUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(infoUser)))
            .andExpect(status().isCreated());

        // Validate the InfoUser in the database
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeCreate + 1);
        InfoUser testInfoUser = infoUserList.get(infoUserList.size() - 1);
    }

    @Test
    @Transactional
    void createInfoUserWithExistingId() throws Exception {
        // Create the InfoUser with an existing ID
        infoUser.setId(1L);

        int databaseSizeBeforeCreate = infoUserRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restInfoUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(infoUser)))
            .andExpect(status().isBadRequest());

        // Validate the InfoUser in the database
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllInfoUsers() throws Exception {
        // Initialize the database
        infoUserRepository.saveAndFlush(infoUser);

        // Get all the infoUserList
        restInfoUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(infoUser.getId().intValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllInfoUsersWithEagerRelationshipsIsEnabled() throws Exception {
        when(infoUserRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restInfoUserMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(infoUserRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllInfoUsersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(infoUserRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restInfoUserMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(infoUserRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    void getInfoUser() throws Exception {
        // Initialize the database
        infoUserRepository.saveAndFlush(infoUser);

        // Get the infoUser
        restInfoUserMockMvc
            .perform(get(ENTITY_API_URL_ID, infoUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(infoUser.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingInfoUser() throws Exception {
        // Get the infoUser
        restInfoUserMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewInfoUser() throws Exception {
        // Initialize the database
        infoUserRepository.saveAndFlush(infoUser);

        int databaseSizeBeforeUpdate = infoUserRepository.findAll().size();

        // Update the infoUser
        InfoUser updatedInfoUser = infoUserRepository.findById(infoUser.getId()).get();
        // Disconnect from session so that the updates on updatedInfoUser are not directly saved in db
        em.detach(updatedInfoUser);

        restInfoUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedInfoUser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedInfoUser))
            )
            .andExpect(status().isOk());

        // Validate the InfoUser in the database
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeUpdate);
        InfoUser testInfoUser = infoUserList.get(infoUserList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingInfoUser() throws Exception {
        int databaseSizeBeforeUpdate = infoUserRepository.findAll().size();
        infoUser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInfoUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, infoUser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(infoUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the InfoUser in the database
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchInfoUser() throws Exception {
        int databaseSizeBeforeUpdate = infoUserRepository.findAll().size();
        infoUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInfoUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(infoUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the InfoUser in the database
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamInfoUser() throws Exception {
        int databaseSizeBeforeUpdate = infoUserRepository.findAll().size();
        infoUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInfoUserMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(infoUser)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the InfoUser in the database
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateInfoUserWithPatch() throws Exception {
        // Initialize the database
        infoUserRepository.saveAndFlush(infoUser);

        int databaseSizeBeforeUpdate = infoUserRepository.findAll().size();

        // Update the infoUser using partial update
        InfoUser partialUpdatedInfoUser = new InfoUser();
        partialUpdatedInfoUser.setId(infoUser.getId());

        restInfoUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInfoUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInfoUser))
            )
            .andExpect(status().isOk());

        // Validate the InfoUser in the database
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeUpdate);
        InfoUser testInfoUser = infoUserList.get(infoUserList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateInfoUserWithPatch() throws Exception {
        // Initialize the database
        infoUserRepository.saveAndFlush(infoUser);

        int databaseSizeBeforeUpdate = infoUserRepository.findAll().size();

        // Update the infoUser using partial update
        InfoUser partialUpdatedInfoUser = new InfoUser();
        partialUpdatedInfoUser.setId(infoUser.getId());

        restInfoUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedInfoUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedInfoUser))
            )
            .andExpect(status().isOk());

        // Validate the InfoUser in the database
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeUpdate);
        InfoUser testInfoUser = infoUserList.get(infoUserList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingInfoUser() throws Exception {
        int databaseSizeBeforeUpdate = infoUserRepository.findAll().size();
        infoUser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInfoUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, infoUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(infoUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the InfoUser in the database
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchInfoUser() throws Exception {
        int databaseSizeBeforeUpdate = infoUserRepository.findAll().size();
        infoUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInfoUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(infoUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the InfoUser in the database
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamInfoUser() throws Exception {
        int databaseSizeBeforeUpdate = infoUserRepository.findAll().size();
        infoUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restInfoUserMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(infoUser)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the InfoUser in the database
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteInfoUser() throws Exception {
        // Initialize the database
        infoUserRepository.saveAndFlush(infoUser);

        int databaseSizeBeforeDelete = infoUserRepository.findAll().size();

        // Delete the infoUser
        restInfoUserMockMvc
            .perform(delete(ENTITY_API_URL_ID, infoUser.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InfoUser> infoUserList = infoUserRepository.findAll();
        assertThat(infoUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
