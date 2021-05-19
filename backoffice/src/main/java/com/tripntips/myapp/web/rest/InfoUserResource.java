package com.tripntips.myapp.web.rest;

import com.tripntips.myapp.domain.InfoUser;
import com.tripntips.myapp.repository.InfoUserRepository;
import com.tripntips.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.tripntips.myapp.domain.InfoUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InfoUserResource {

    private final Logger log = LoggerFactory.getLogger(InfoUserResource.class);

    private static final String ENTITY_NAME = "infoUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InfoUserRepository infoUserRepository;

    public InfoUserResource(InfoUserRepository infoUserRepository) {
        this.infoUserRepository = infoUserRepository;
    }

    /**
     * {@code POST  /info-users} : Create a new infoUser.
     *
     * @param infoUser the infoUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new infoUser, or with status {@code 400 (Bad Request)} if the infoUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/info-users")
    public ResponseEntity<InfoUser> createInfoUser(@Valid @RequestBody InfoUser infoUser) throws URISyntaxException {
        log.debug("REST request to save InfoUser : {}", infoUser);
        if (infoUser.getId() != null) {
            throw new BadRequestAlertException("A new infoUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InfoUser result = infoUserRepository.save(infoUser);
        return ResponseEntity
            .created(new URI("/api/info-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /info-users/:id} : Updates an existing infoUser.
     *
     * @param id the id of the infoUser to save.
     * @param infoUser the infoUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated infoUser,
     * or with status {@code 400 (Bad Request)} if the infoUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the infoUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/info-users/{id}")
    public ResponseEntity<InfoUser> updateInfoUser(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody InfoUser infoUser
    ) throws URISyntaxException {
        log.debug("REST request to update InfoUser : {}, {}", id, infoUser);
        if (infoUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, infoUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!infoUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InfoUser result = infoUserRepository.save(infoUser);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, infoUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /info-users/:id} : Partial updates given fields of an existing infoUser, field will ignore if it is null
     *
     * @param id the id of the infoUser to save.
     * @param infoUser the infoUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated infoUser,
     * or with status {@code 400 (Bad Request)} if the infoUser is not valid,
     * or with status {@code 404 (Not Found)} if the infoUser is not found,
     * or with status {@code 500 (Internal Server Error)} if the infoUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/info-users/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<InfoUser> partialUpdateInfoUser(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody InfoUser infoUser
    ) throws URISyntaxException {
        log.debug("REST request to partial update InfoUser partially : {}, {}", id, infoUser);
        if (infoUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, infoUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!infoUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InfoUser> result = infoUserRepository
            .findById(infoUser.getId())
            .map(
                existingInfoUser -> {
                    return existingInfoUser;
                }
            )
            .map(infoUserRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, infoUser.getId().toString())
        );
    }

    /**
     * {@code GET  /info-users} : get all the infoUsers.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of infoUsers in body.
     */
    @GetMapping("/info-users")
    public List<InfoUser> getAllInfoUsers(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all InfoUsers");
        return infoUserRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /info-users/:id} : get the "id" infoUser.
     *
     * @param id the id of the infoUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the infoUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/info-users/{id}")
    public ResponseEntity<InfoUser> getInfoUser(@PathVariable Long id) {
        log.debug("REST request to get InfoUser : {}", id);
        Optional<InfoUser> infoUser = infoUserRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(infoUser);
    }

    /**
     * {@code DELETE  /info-users/:id} : delete the "id" infoUser.
     *
     * @param id the id of the infoUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/info-users/{id}")
    public ResponseEntity<Void> deleteInfoUser(@PathVariable Long id) {
        log.debug("REST request to delete InfoUser : {}", id);
        infoUserRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
