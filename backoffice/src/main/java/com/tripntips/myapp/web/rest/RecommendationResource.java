package com.tripntips.myapp.web.rest;

import com.tripntips.myapp.domain.Recommendation;
import com.tripntips.myapp.repository.RecommendationRepository;
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
 * REST controller for managing {@link com.tripntips.myapp.domain.Recommendation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RecommendationResource {

    private final Logger log = LoggerFactory.getLogger(RecommendationResource.class);

    private static final String ENTITY_NAME = "recommendation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecommendationRepository recommendationRepository;

    public RecommendationResource(RecommendationRepository recommendationRepository) {
        this.recommendationRepository = recommendationRepository;
    }

    /**
     * {@code POST  /recommendations} : Create a new recommendation.
     *
     * @param recommendation the recommendation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recommendation, or with status {@code 400 (Bad Request)} if the recommendation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/recommendations")
    public ResponseEntity<Recommendation> createRecommendation(@Valid @RequestBody Recommendation recommendation)
        throws URISyntaxException {
        log.debug("REST request to save Recommendation : {}", recommendation);
        if (recommendation.getId() != null) {
            throw new BadRequestAlertException("A new recommendation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Recommendation result = recommendationRepository.save(recommendation);
        return ResponseEntity
            .created(new URI("/api/recommendations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /recommendations/:id} : Updates an existing recommendation.
     *
     * @param id the id of the recommendation to save.
     * @param recommendation the recommendation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recommendation,
     * or with status {@code 400 (Bad Request)} if the recommendation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recommendation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/recommendations/{id}")
    public ResponseEntity<Recommendation> updateRecommendation(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Recommendation recommendation
    ) throws URISyntaxException {
        log.debug("REST request to update Recommendation : {}, {}", id, recommendation);
        if (recommendation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, recommendation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!recommendationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Recommendation result = recommendationRepository.save(recommendation);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, recommendation.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /recommendations/:id} : Partial updates given fields of an existing recommendation, field will ignore if it is null
     *
     * @param id the id of the recommendation to save.
     * @param recommendation the recommendation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recommendation,
     * or with status {@code 400 (Bad Request)} if the recommendation is not valid,
     * or with status {@code 404 (Not Found)} if the recommendation is not found,
     * or with status {@code 500 (Internal Server Error)} if the recommendation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/recommendations/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Recommendation> partialUpdateRecommendation(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Recommendation recommendation
    ) throws URISyntaxException {
        log.debug("REST request to partial update Recommendation partially : {}, {}", id, recommendation);
        if (recommendation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, recommendation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!recommendationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Recommendation> result = recommendationRepository
            .findById(recommendation.getId())
            .map(
                existingRecommendation -> {
                    if (recommendation.getTitle() != null) {
                        existingRecommendation.setTitle(recommendation.getTitle());
                    }
                    if (recommendation.getContent() != null) {
                        existingRecommendation.setContent(recommendation.getContent());
                    }
                    if (recommendation.getPrice() != null) {
                        existingRecommendation.setPrice(recommendation.getPrice());
                    }
                    if (recommendation.getCity() != null) {
                        existingRecommendation.setCity(recommendation.getCity());
                    }
                    if (recommendation.getGlobalRating() != null) {
                        existingRecommendation.setGlobalRating(recommendation.getGlobalRating());
                    }

                    return existingRecommendation;
                }
            )
            .map(recommendationRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, recommendation.getId().toString())
        );
    }

    /**
     * {@code GET  /recommendations} : get all the recommendations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recommendations in body.
     */
    @GetMapping("/recommendations")
    public List<Recommendation> getAllRecommendations() {
        log.debug("REST request to get all Recommendations");
        return recommendationRepository.findAll();
    }

    /**
     * {@code GET  /recommendations/:id} : get the "id" recommendation.
     *
     * @param id the id of the recommendation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recommendation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/recommendations/{id}")
    public ResponseEntity<Recommendation> getRecommendation(@PathVariable Long id) {
        log.debug("REST request to get Recommendation : {}", id);
        Optional<Recommendation> recommendation = recommendationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(recommendation);
    }

    /**
     * {@code DELETE  /recommendations/:id} : delete the "id" recommendation.
     *
     * @param id the id of the recommendation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/recommendations/{id}")
    public ResponseEntity<Void> deleteRecommendation(@PathVariable Long id) {
        log.debug("REST request to delete Recommendation : {}", id);
        recommendationRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
