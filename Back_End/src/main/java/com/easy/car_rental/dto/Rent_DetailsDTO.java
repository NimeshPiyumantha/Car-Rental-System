package com.easy.car_rental.dto;

import com.easy.car_rental.entity.Car;
import com.easy.car_rental.entity.Rent;
import com.easy.car_rental.entity.Rent_Detail_PK;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data

public class Rent_DetailsDTO {
    private String car_Id;
    private String rent_Id;
}
