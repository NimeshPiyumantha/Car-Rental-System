package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.CarDTO;
import com.easy.car_rental.embeded.Image;
import com.easy.car_rental.embeded.ImageDTO;
import com.easy.car_rental.entity.Car;
import com.easy.car_rental.enums.CarType;
import com.easy.car_rental.enums.FuelType;
import com.easy.car_rental.enums.TransmissionType;
import com.easy.car_rental.repo.CarRepo;
import com.easy.car_rental.service.CarService;
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
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRepo repo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCar(CarDTO dto) {
        Car car = new Car(dto.getCar_Id(),dto.getName(),dto.getBrand(), CarType.valueOf(dto.getType()),new Image(),dto.getNumber_Of_Passengers(), TransmissionType.valueOf(dto.getTransmission_Type()), FuelType.valueOf(dto.getFuel_Type()),dto.getRent_Duration_Price(),dto.getPrice_Extra_KM(),dto.getRegistration_Number(),dto.getFree_Mileage(),dto.getColor(),dto.getVehicleAvailabilityType());
        if (repo.existsById(dto.getCar_Id())) {
            throw new RuntimeException("Car Already Exist. Please enter another id..!");
        }
        System.out.println(car.getImage().getFront_View());
        try {
            byte[] bytes1 = dto.getImage().getFront_View().getBytes();
            byte[] bytes2 = dto.getImage().getBack_View().getBytes();
            byte[] bytes3 = dto.getImage().getSide_View().getBytes();
            byte[] bytes4 = dto.getImage().getInterior().getBytes();

            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            File uploadsDir = new File(projectPath + "/uploads");
            System.out.println(projectPath);

            uploadsDir.mkdir();

            Path location1 = Paths.get(uploadsDir + "/car" + car.getImage().getFront_View() + ".png");
            Path location2 = Paths.get(uploadsDir + "/car" + car.getImage().getBack_View() + ".png");
            Path location3 = Paths.get(uploadsDir + "/car" + car.getImage().getSide_View() + ".png");
            Path location4 = Paths.get(uploadsDir + "/car" + car.getImage().getInterior() + ".png");

            Files.write(location1, bytes1);
            Files.write(location2, bytes2);
            Files.write(location3, bytes3);
            Files.write(location4, bytes4);

            dto.getImage().getFront_View().transferTo(location1);
            dto.getImage().getBack_View().transferTo(location2);
            dto.getImage().getSide_View().transferTo(location3);
            dto.getImage().getInterior().transferTo(location4);

            car.getImage().setFront_View(location1.toString());
            car.getImage().setBack_View(location2.toString());
            car.getImage().setSide_View(location3.toString());
            car.getImage().setInterior(location4.toString());

        } catch (IOException | URISyntaxException e) {
            throw new RuntimeException(e);
        }

        System.out.println(car);
        repo.save(car);
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

    @Override
    public ArrayList<CarDTO> getAllCar() {
        return mapper.map(repo.findAll(), new TypeToken<ArrayList<Car>>() {
        }.getType());
    }
}
