package com.easy.car_rental.service;

import com.easy.car_rental.dto.AdminDTO;
import com.easy.car_rental.dto.DriverDTO;

import java.util.ArrayList;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface DriverService {
    void saveDriver(DriverDTO dto);
    void updateDriver(DriverDTO dto);
    void deleteDriver(String reg_ID);

}
