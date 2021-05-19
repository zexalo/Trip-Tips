package com.tripntips.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A InfoUser.
 */
@Entity
@Table(name = "info_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class InfoUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(
        name = "rel_info_user__recommendation",
        joinColumns = @JoinColumn(name = "info_user_id"),
        inverseJoinColumns = @JoinColumn(name = "recommendation_id")
    )
    @JsonIgnoreProperties(value = { "category", "country", "picture" }, allowSetters = true)
    private Set<Recommendation> recommendations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public InfoUser id(Long id) {
        this.id = id;
        return this;
    }

    public User getUser() {
        return this.user;
    }

    public InfoUser user(User user) {
        this.setUser(user);
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Recommendation> getRecommendations() {
        return this.recommendations;
    }

    public InfoUser recommendations(Set<Recommendation> recommendations) {
        this.setRecommendations(recommendations);
        return this;
    }

    public InfoUser addRecommendation(Recommendation recommendation) {
        this.recommendations.add(recommendation);
        return this;
    }

    public InfoUser removeRecommendation(Recommendation recommendation) {
        this.recommendations.remove(recommendation);
        return this;
    }

    public void setRecommendations(Set<Recommendation> recommendations) {
        this.recommendations = recommendations;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InfoUser)) {
            return false;
        }
        return id != null && id.equals(((InfoUser) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InfoUser{" +
            "id=" + getId() +
            "}";
    }
}
