package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.dto.RentDTO;
import com.easy.car_rental.entity.Car;
import com.easy.car_rental.entity.Driver;
import com.easy.car_rental.entity.Rent;
import com.easy.car_rental.entity.Rent_Details;
import com.easy.car_rental.repo.CarRepo;
import com.easy.car_rental.repo.DriverRepo;
import com.easy.car_rental.repo.RentRepo;
import com.easy.car_rental.service.RentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

import static com.easy.car_rental.enums.AvailabilityType.UNAVAILABLE;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Service
@Transactional
public class RentServiceImpl implements RentService {
    @Autowired
    private RentRepo repo;
    @Autowired
    private CarRepo carRepo;
    @Autowired
    private DriverRepo driverRepo;
    @Autowired
    private ModelMapper mapper;

    @Override
    public CustomDTO rentIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }

    @Override
    public void bookingCars(RentDTO dto) {
        Rent rent = mapper.map(dto, Rent.class);

        if (repo.existsById(dto.getRent_Id())) {
            throw new RuntimeException("Booking" + dto.getRent_Id() + " Already added.!");
        }

        if(dto.getRequestType().equals("YES")){
            List<Driver> drivers = driverRepo.availableDrivers();
            int x;

            for (Rent_Details rentDetails : rent.getRent_Details()){
                x=new Random().nextInt(drivers.size());
                rentDetails.setRent_Id(drivers.get(x).getUser_Id());
                Car car = carRepo.findById(rentDetails.getRent_Id()).get();
                car.setVehicleAvailabilityType(UNAVAILABLE);
                driverRepo.save(drivers.get(x));
            }
        }
        repo.save(rent);
    }
}
