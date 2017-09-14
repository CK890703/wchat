package com.sy.domain.business;

import java.io.Serializable;

public class DataSequence implements Serializable {

    private static final long serialVersionUID = 1373247489032456658L;

    private Long id;

    private String name;

    private Long currentValue;

    private Byte increment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Long getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(Long currentValue) {
        this.currentValue = currentValue;
    }

    public Byte getIncrement() {
        return increment;
    }

    public void setIncrement(Byte increment) {
        this.increment = increment;
    }
}