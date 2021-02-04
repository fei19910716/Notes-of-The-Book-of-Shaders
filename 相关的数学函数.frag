# 对常用的数学函数熟悉，对于shader的使用非常有帮助。

# 画线性曲线
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st) {    
    return smoothstep(0.02, 0.0, abs(st.y - st.x));
}// 在0.0时取得max值1.0，然后平滑递减

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution; // frag的位置进行归一化

    float y = st.x; // 这里输入测试的函数

    vec3 color = vec3(y); // 构造背景颜色，st.x为0时为黑色，为1时为白色

    // Plot a line
    float pct = plot(st);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0); // 对背景色和绿色进行差值

	gl_FragColor = vec4(color,1.0);
}

# 扩展：smoothstep函数解析

smoothstep(t1,t2,x):
当t1 > t2时，x==t2时取得峰值1.0，然后在（t2,t1）区间平滑递减
当t1 < t2时，x==t2时取得峰值1.0，然后在（t1,t2）区间平滑递减

smoothstep(t1,t2,x) - smoothstep(t2,t3,x)，在x==t2时取得峰值1.0，然后平滑递减

smoothstep(t1,t2,x) - smoothstep(t3,t4,x)，在x==（t2,t3）区间时取得峰值1.0，然后平滑递减


# 画指数曲线

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.020, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = pow(st.x,10.616);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}

try the following effect?
