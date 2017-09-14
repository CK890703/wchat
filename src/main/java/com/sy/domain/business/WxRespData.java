package com.sy.domain.business;


import java.util.List;

public class WxRespData extends WxErrMsg{

    //关注该公众账号的总用户数
    private Integer total;

    //本次获取的数量
    private Integer count;

    //openid列表
    private List<String> openidlist;

    //拉取列表最后一个用户的openid
    private String nextOpenid;

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<String> getOpenidlist() {
        return openidlist;
    }

    public void setOpenidlist(List<String> openidlist) {
        this.openidlist = openidlist;
    }

    public String getNextOpenid() {
        return nextOpenid;
    }

    public void setNextOpenid(String nextOpenid) {
        this.nextOpenid = nextOpenid;
    }

}
