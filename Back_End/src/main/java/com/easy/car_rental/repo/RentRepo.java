package com.easy.car_rental.repo;

import com.easy.car_rental.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface RentRepo extends JpaRepository<Rent, String> {
    @Query(value = "SELECT rent_Id FROM Rent ORDER BY rent_Id DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
