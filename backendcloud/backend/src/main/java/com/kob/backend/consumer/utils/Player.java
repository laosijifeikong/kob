package com.kob.backend.consumer.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Player
{
    private Integer id;
    private Integer botId; // -1表示人工出战
    private String botCode;
    private Integer sx;
    private Integer sy;
    private List<Integer> steps;

    public boolean check_tail_increasing(int step) { //检测当前回合，蛇的长度是否增加
        if (step <= 10) return true;
        return step % 3 == 1;
    }

    public List<Cell> getCells(){
        List<Cell> res = new ArrayList<>();

        int[] dx = {-1, 0, 1, 0}, dy = {0, 1, 0, -1};
        int x = sx, y = sy;
        int step = 0;
        res.add(new Cell(x, y));
        for(int d: steps)  //d中steps数组中依次取出的值
        {
            x += dx[d];
            y += dy[d];
            res.add(new Cell(x,y));
            if(!check_tail_increasing( ++step)){
                res.remove(0);
            }
        }
        return res;
    }

    public String getStepString(){
        StringBuilder res = new StringBuilder();
        for(int d: steps){
            res.append(d);
        }

        return res.toString();
    }
}