package com.deepbookfantasy.common.util;

import org.hibernate.dialect.MySQL5Dialect;
import org.hibernate.dialect.MySQL5InnoDBDialect;

/**
 * Created By HeartunderBlade on 2018/6/3
 */
public class MySQL5DialectUTF8 extends MySQL5Dialect {
    @Override
    public String getTableTypeString() {
        return " ENGINE=InnoDB DEFAULT CHARSET=utf8";
    }
}
