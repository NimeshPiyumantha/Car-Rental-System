package com.easy.car_rental.entity;

import com.easy.car_rental.embeded.Name;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author : Nimesh Piyumantha
 * @since : 0.1.0
 **/
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Driver {
    @Id
    private String driver_Id;
    private String role_Type;
    @Embedded
    private Name name;
    private String contact_No;
    private String address;
    private String email;
    private String nic;
    private String license_No;
    private String password;
    private String nic_Img;
    private String license_Img;

}
