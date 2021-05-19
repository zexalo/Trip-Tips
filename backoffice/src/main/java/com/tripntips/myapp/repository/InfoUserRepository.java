package com.tripntips.myapp.repository;

import com.tripntips.myapp.domain.InfoUser;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the InfoUser entity.
 */
@Repository
public interface InfoUserRepository extends JpaRepository<InfoUser, Long> {
    @Query(
        value = "select distinct infoUser from InfoUser infoUser left join fetch infoUser.recommendations",
        countQuery = "select count(distinct infoUser) from InfoUser infoUser"
    )
    Page<InfoUser> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct infoUser from InfoUser infoUser left join fetch infoUser.recommendations")
    List<InfoUser> findAllWithEagerRelationships();

    @Query("select infoUser from InfoUser infoUser left join fetch infoUser.recommendations where infoUser.id =:id")
    Optional<InfoUser> findOneWithEagerRelationships(@Param("id") Long id);
}
