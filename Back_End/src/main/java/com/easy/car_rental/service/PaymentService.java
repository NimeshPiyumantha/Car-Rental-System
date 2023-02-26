package com.easy.car_rental.service;

import com.easy.car_rental.dto.CarDTO;
import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.dto.PaymentDTO;
import com.easy.car_rental.dto.Reg_UserDTO;

import java.util.ArrayList;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface PaymentService {
    CustomDTO paymentIdGenerate();
    void savePayment(PaymentDTO dto,String rentID);
    ArrayList<PaymentDTO> getAllPayment();
}
