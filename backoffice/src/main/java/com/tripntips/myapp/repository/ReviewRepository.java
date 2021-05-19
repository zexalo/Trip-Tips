package com.tripntips.myapp.repository;

import com.tripntips.myapp.domain.Review;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Review entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("select review from Review review where review.user.login = ?#{principal.username}")
    List<Review> findByUserIsCurrentUser();
}
