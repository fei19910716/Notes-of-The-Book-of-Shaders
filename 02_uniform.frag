# Uniforms

# Although each parallel thread of GPU is blind to the others, we need to be able to send some inputs from the CPU to all the threads. Because of the architecture of the graphics card those inputs are going to be equal (uniform) to all the threads and necessarily set as read only.

# These inputs are called uniform and come in most of the supported types: float, vec2, vec3, vec4, mat2, mat3, mat4, sampler2D and samplerCube.

我们定义三个uniform变量如下：
```c
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load
```

```c
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {
	gl_FragColor = vec4(abs(sin(u_time)),0.0,0.0,1.0); // 红色分量随时间变化
}
```


# gl_FragCoord

# In the same way GLSL gives us a default output, vec4 gl_FragColor, it also gives us a default input, vec4 gl_FragCoord, which holds the screen coordinates of the pixel or screen fragment that the active thread is working on. 

try to figure out the following shader effect?
```c
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy / u_resolution; // normalize the cood of the current pixel
    vec2 mouse_color = u_mouse.xy / u_resolution; // normalize the cood of the mouse
    vec2 color = floor(vec2(1.,1.)- (st - mouse_color)); // make the color change with the mouse
	gl_FragColor = vec4(color,abs(sin(u_time)),1.0); // make the BLUE change with the time
}
```