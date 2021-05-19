package com.tripntips.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.ZonedDateTime;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Review.
 */
@Entity
@Table(name = "review")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Review implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "rating", nullable = false)
    private Integer rating;

    @Column(name = "content")
    private String content;

    @NotNull
    @Column(name = "created_at", nullable = false)
    private ZonedDateTime createdAt;

    @ManyToOne(optional = false)
    @NotNull
    private User user;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "category", "country", "picture" }, allowSetters = true)
    private Recommendation recommendation;

    @ManyToOne
    private Picture picture;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Review id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getRating() {
        return this.rating;
    }

    public Review rating(Integer rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getContent() {
        return this.content;
    }

    public Review content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ZonedDateTime getCreatedAt() {
        return this.createdAt;
    }

    public Review createdAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return this.user;
    }

    public Review user(User user) {
        this.setUser(user);
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Recommendation getRecommendation() {
        return this.recommendation;
    }

    public Review recommendation(Recommendation recommendation) {
        this.setRecommendation(recommendation);
        return this;
    }

    public void setRecommendation(Recommendation recommendation) {
        this.recommendation = recommendation;
    }

    public Picture getPicture() {
        return this.picture;
    }

    public Review picture(Picture picture) {
        this.setPicture(picture);
        return this;
    }

    public void setPicture(Picture picture) {
        this.picture = picture;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Review)) {
            return false;
        }
        return id != null && id.equals(((Review) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Review{" +
            "id=" + getId() +
            ", rating=" + getRating() +
            ", content='" + getContent() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            "}";
    }
}
