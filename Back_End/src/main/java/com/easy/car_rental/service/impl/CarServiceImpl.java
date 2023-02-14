package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.CarDTO;
import com.easy.car_rental.entity.Car;
import com.easy.car_rental.entity.Reg_User;
import com.easy.car_rental.repo.CarRepo;
import com.easy.car_rental.service.CarService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Service
@Transactional
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRepo repo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCar(CarDTO dto) {
        if (repo.existsById(dto.getCar_Id())) {
            throw new RuntimeException("Car Already Exist. Please enter another id..!");
        }
        repo.save(mapper.map(dto, Car.class));
    }

    @Override
    public void updateCar(CarDTO dto) {
        if (!repo.existsById(dto.getCar_Id())) {
            throw new RuntimeException("Car Not Exist. Please enter Valid id..!");
        }
        repo.save(mapper.map(dto, Car.class));
    }

    @Override
    public void deleteCar(String car_Id) {
        if (!repo.existsById(car_Id)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        repo.deleteById(car_Id);
    }
}
