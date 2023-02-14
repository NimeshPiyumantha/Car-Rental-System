package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.DriverDTO;
import com.easy.car_rental.entity.Admin;
import com.easy.car_rental.entity.Driver;
import com.easy.car_rental.repo.AdminRepo;
import com.easy.car_rental.repo.DriverRepo;
import com.easy.car_rental.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepo repo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveDriver(DriverDTO dto) {
        if (repo.existsById(dto.getDriver_Id())) {
            throw new RuntimeException("Driver Already Exist. Please enter another id..!");
        }
        repo.save(mapper.map(dto, Driver.class));
    }

    @Override
    public void updateDriver(DriverDTO dto) {
        if (!repo.existsById(dto.getDriver_Id())) {
            throw new RuntimeException("Driver Not Exist. Please enter Valid id..!");
        }
        repo.save(mapper.map(dto, Driver.class));
    }

    @Override
    public void deleteDriver(String driver_ID) {
        if (!repo.existsById(driver_ID)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        repo.deleteById(driver_ID);
    }

    @Override
    public ArrayList<DriverDTO> getAllDriver() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<Driver>>() {
        }.getType());
    }
}