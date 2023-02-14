package com.easy.car_rental.service.impl;

import com.easy.car_rental.repo.AdminRepo;
import com.easy.car_rental.repo.DriverRepo;
import com.easy.car_rental.service.DriverService;
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
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepo repo;
}

