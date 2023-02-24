package com.easy.car_rental.service;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.dto.RentDTO;
import org.springframework.web.bind.annotation.RequestBody;

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
}
