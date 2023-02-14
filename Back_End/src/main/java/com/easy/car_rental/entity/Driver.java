package com.easy.car_rental.entity;

import com.easy.car_rental.embeded.Name;
import enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

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

    @Embedded
    private Name name;
    private String contact_No;
    private String address;
    private String email;
    private String nic_No;
    private String license_No;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;
}
