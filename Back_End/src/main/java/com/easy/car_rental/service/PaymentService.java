package com.easy.car_rental.service;

import com.easy.car_rental.dto.CarDTO;
import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.dto.PaymentDTO;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
public interface PaymentService {
    CustomDTO paymentIdGenerate();
    void savePayment(PaymentDTO dto);
}
