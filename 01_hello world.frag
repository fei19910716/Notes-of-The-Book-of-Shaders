# 第一个frag shader

```c
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
	gl_FragColor = vec4(1.0,0.0,1.0,1.0);
}
```

# 虽然很简单，但是包含了很多内容：

# Shader Language has a single main function that returns a color at the end. This is similar to C.

# The final pixel color is assigned to the reserved global variable gl_FragColor.

# This C-flavored language has built in variables (like gl_FragColor), functions and types（like vec4）.

# The vec4 type we can infer that the four arguments respond to the RED, GREEN, BLUE and ALPHA channels. And these values are normalized, which means they go from 0.0 to 1.0.

# 条件编译：we insert the line 2 if GL_ES is defined, which mostly happens when the code is compiled on mobile devices and browsers.

# Float types are vital in shaders, so the level of precision is crucial.Lower precision means faster rendering, but at the cost of quality（like precision mediump float;）.

# The most important is that GLSL specs don’t guarantee that variables will be automatically casted. You should get used to putting the point (.) in your floats. 

```c
void main() {
    gl_FragColor = vec4(1,0,0,1);   // ERROR
}
```

# 定义函数
```c
vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}
```
# There are multiple ways of constructing vec4 types:
```c
vec4 color = vec4(vec3(1.0,0.0,1.0),1.0);
```