package com.easy.car_rental.service.impl;

import com.easy.car_rental.dto.CustomDTO;
import com.easy.car_rental.repo.DriverRepo;
import com.easy.car_rental.repo.PaymentRepo;
import com.easy.car_rental.service.PaymentService;
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
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepo repo;

    @Autowired
    private ModelMapper mapper;
    @Override
    public CustomDTO paymentIdGenerate() {
        return new CustomDTO(repo.getLastIndex());
    }
}
