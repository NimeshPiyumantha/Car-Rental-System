package com.easy.car_rental.repo;

import com.easy.car_rental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface CarRepo extends JpaRepository<Car,String> {
    @Query(value = "SELECT car_Id FROM Car ORDER BY car_Id DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
