package com.tripntips.myapp.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Recommendation.
 */
@Entity
@Table(name = "recommendation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Recommendation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "price")
    private Integer price;

    @Column(name = "city")
    private String city;

    @Column(name = "global_rating")
    private Integer globalRating;

    @ManyToOne(optional = false)
    @NotNull
    private Category category;

    @ManyToOne(optional = false)
    @NotNull
    private Country country;

    @ManyToOne
    private Picture picture;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Recommendation id(Long id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return this.title;
    }

    public Recommendation title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public Recommendation content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getPrice() {
        return this.price;
    }

    public Recommendation price(Integer price) {
        this.price = price;
        return this;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getCity() {
        return this.city;
    }

    public Recommendation city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getGlobalRating() {
        return this.globalRating;
    }

    public Recommendation globalRating(Integer globalRating) {
        this.globalRating = globalRating;
        return this;
    }

    public void setGlobalRating(Integer globalRating) {
        this.globalRating = globalRating;
    }

    public Category getCategory() {
        return this.category;
    }

    public Recommendation category(Category category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Country getCountry() {
        return this.country;
    }

    public Recommendation country(Country country) {
        this.setCountry(country);
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Picture getPicture() {
        return this.picture;
    }

    public Recommendation picture(Picture picture) {
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
        if (!(o instanceof Recommendation)) {
            return false;
        }
        return id != null && id.equals(((Recommendation) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Recommendation{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", price=" + getPrice() +
            ", city='" + getCity() + "'" +
            ", globalRating=" + getGlobalRating() +
            "}";
    }
}
