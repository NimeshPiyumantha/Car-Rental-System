package com.easy.car_rental.repo;

import com.easy.car_rental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface CarRepo extends JpaRepository<Car, String> {
    @Query(value = "SELECT car_Id FROM Car ORDER BY car_Id DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT COUNT(car_Id) FROM Car", nativeQuery = true)
    int getSumCar();

    @Query(value = "SELECT COUNT(car_Id) FROM Car WHERE vehicleAvailabilityType='AVAILABLE';", nativeQuery = true)
    int getSumAvailableCar();

    @Query(value = "SELECT * FROM Car WHERE type =?1 and fuel_Type=?2 and vehicleAvailabilityType='AVAILABLE' ", nativeQuery = true)
    ArrayList<Car> filterCar(String type, String fuel_Type);

}
