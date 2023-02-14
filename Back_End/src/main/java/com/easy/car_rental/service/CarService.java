package com.easy.car_rental.service;

import com.easy.car_rental.dto.AdminDTO;
import com.easy.car_rental.dto.CarDTO;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface CarService {
    void saveCar(CarDTO dto);
    void updateCar(CarDTO dto);
    void deleteCar(String car_Id);
}
