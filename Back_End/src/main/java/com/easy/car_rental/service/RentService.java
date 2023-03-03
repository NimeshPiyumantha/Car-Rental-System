package com.easy.car_rental.service;

import antlr.collections.List;
import com.easy.car_rental.dto.CarDTO;
import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.dto.RentDTO;
import com.easy.car_rental.entity.Car;
import com.easy.car_rental.entity.Rent;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface RentService {
    CustomDTO rentIdGenerate();

    void bookingCars(@RequestBody RentDTO dto);

    CustomDTO getSumOfBooking();

    CustomDTO getSumOfBookingPending();

    CustomDTO getSumOfBookingActive();

    ArrayList <RentDTO> getAllRent();

    void deleteRent(String rentID);

    void bookingConform(String rentID, String driverId);

    void bookingReject(String rentID, String driverId);
    RentDTO searchId(String id);
}
