package com.easy.car_rental.service;

import com.easy.car_rental.dto.CarDTO;

import java.util.ArrayList;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface CarService {
    void saveCar(CarDTO dto);

    void updateCar(CarDTO dto);

    void deleteCar(String car_Id);

    ArrayList<CarDTO> getAllCar();
}