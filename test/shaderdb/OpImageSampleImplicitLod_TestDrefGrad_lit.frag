#version 450 core

layout(set = 0, binding = 0) uniform sampler2DShadow samp2DS;
layout(location = 0) in vec3 inUV;
layout(location = 0) out vec4 oColor;

void main()
{
    oColor = vec4(textureGrad(samp2DS, inUV, vec2(0.1, 0.2), vec2(0.3, 0.4)));
}


// BEGIN_SHADERTEST
/*
; RUN: amdllpc -spvgen-dir=%spvgendir% -v %gfxip %s | FileCheck -check-prefix=SHADERTEST %s

; SHADERTEST-LABEL: {{^// LLPC}} SPIRV-to-LLVM translation results
; SHADERTEST: float @spirv.image.sample.f32.2D.dref.grad({{.*}}, <2 x float> <float 0x3FB99999A0000000, float 0x3FC99999A0000000>, <2 x float> <float 0x3FD3333340000000, float 0x3FD99999A0000000>, {{.*}})

; SHADERTEST-LABEL: {{^// LLPC}} SPIR-V lowering results
; SHADERTEST: call <4 x i32>{{.*}}@llpc.call.load.sampler.desc.v4i32
; SHADERTEST: call <8 x i32>{{.*}}@llpc.call.load.resource.desc.v8i32
; SHADERTEST: call float @llpc.image.sample.f32.2D.dref.grad{{.*}}({{.*}}, <2 x float> <float 0x3FB99999A0000000, float 0x3FC99999A0000000>, <2 x float> <float 0x3FD3333340000000, float 0x3FD99999A0000000>, {{.*}})

; SHADERTEST-LABEL: {{^// LLPC}} pipeline patching results
; SHADERTEST: load <4 x i32>, <4 x i32> addrspace(4)* %{{[0-9]*}}
; SHADERTEST: load <8 x i32>, <8 x i32> addrspace(4)* %{{[0-9]*}}
; SHADERTEST: call float @llvm.amdgcn.image.sample.c.d.2d.f32.f32.f32({{.*}}, float 0x3FB99999A0000000, float 0x3FC99999A0000000, float 0x3FD3333340000000, float 0x3FD99999A0000000, {{.*}})

; SHADERTEST: AMDLLPC SUCCESS
*/
// END_SHADERTEST