package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.dto.DriverDTO;
import com.easy.car_rental.entity.Car;
import com.easy.car_rental.entity.Driver;
import com.easy.car_rental.entity.User;
import com.easy.car_rental.repo.DriverRepo;
import com.easy.car_rental.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

        Driver driver = new Driver(dto.getUser_Id(), dto.getName(), dto.getContact_No(), dto.getAddress(), dto.getEmail(), dto.getNic_No(), dto.getLicense_No(), "",dto.getDriverAvailability(), new User(dto.getUser().getUser_Id(), dto.getUser().getRole_Type(), dto.getUser().getUser_Name(), dto.getUser().getPassword()));
        System.out.println(driver);
        if (repo.existsById(dto.getUser_Id()))
            throw new RuntimeException("Driver Already Exist. Please enter another id..!");

        try {
            byte[] bytes1 = dto.getLicense_Img().getBytes();

            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            System.out.println(projectPath);
            uploadsDir.mkdir();

            Path location1 = Paths.get(uploadsDir + "/license" + driver.getLicense_No() + ".png");
            Files.write(location1, bytes1);
            dto.getLicense_Img().transferTo(location1);
            driver.setLicense_Img(location1.toString());

            System.out.println(driver);
            repo.save(driver);

        } catch (IOException | URISyntaxException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public void updateDriver(DriverDTO dto) {

        Driver driver = new Driver(dto.getUser_Id(), dto.getName(), dto.getContact_No(), dto.getAddress(), dto.getEmail(), dto.getNic_No(), dto.getLicense_No(), "",dto.getDriverAvailability(), new User(dto.getUser().getUser_Id(), dto.getUser().getRole_Type(), dto.getUser().getUser_Name(), dto.getUser().getPassword()));
        System.out.println(driver);
        if (!repo.existsById(dto.getUser_Id())) {
            throw new RuntimeException("Driver Not Exist. Please enter Valid id..!");
        }

        try {
            byte[] bytes1 = dto.getLicense_Img().getBytes();

            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            System.out.println(projectPath);
            uploadsDir.mkdir();

            Path location1 = Paths.get(uploadsDir + "/license" + driver.getLicense_No() + ".png");
            Files.write(location1, bytes1);
            dto.getLicense_Img().transferTo(location1);
            driver.setLicense_Img(location1.toString());

            System.out.println(driver);
            repo.save(driver);

        } catch (IOException | URISyntaxException e) {
            throw new RuntimeException(e);
        }
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

    @Override
    public CustomDTO userIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public Driver searchDriverId(String id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
        }
        System.out.println(id);
        return mapper.map(repo.findById(id).get(), Driver.class);
    }

    @Override
    public CustomDTO getSumDriver() {
        CustomDTO customDTO = new CustomDTO(repo.getSumDriver());
        System.out.println(customDTO);
        return customDTO;
    }
}