#version 450 core

layout(std430, binding = 0) buffer Block
{
    uint  u1;
    uvec2 u2;
    uvec3 u3;
    uvec4 u4;
} block;

void main()
{
    block.u1 += 1;
    block.u2 += uvec2(2);
    block.u3 += uvec3(3);
    block.u4 += uvec4(4);

    gl_Position = vec4(1.0);
}
// BEGIN_SHADERTEST
/*
; RUN: amdllpc -spvgen-dir=%spvgendir% -v %gfxip %s | FileCheck -check-prefix=SHADERTEST %s

; SHADERTEST-LABEL: {{^// LLPC}} pipeline patching results
; SHADERTEST: call float @llvm.amdgcn.raw.buffer.load.f32(<4 x i32> {{%[^,]+}}, i32 0, i32 0, i32 0)
; SHADERTEST: call void @llvm.amdgcn.raw.buffer.store.f32(float {{%[^,]+}}, <4 x i32> {{%[^,]+}}, i32 0, i32 0, i32 0)
; SHADERTEST: call <2 x float> @llvm.amdgcn.raw.buffer.load.v2f32(<4 x i32> {{%[^,]+}}, i32 8, i32 0, i32 0)
; SHADERTEST: call void @llvm.amdgcn.raw.buffer.store.v2f32(<2 x float> {{%[^,]+}}, <4 x i32> {{%[^,]+}}, i32 8, i32 0, i32 0)
; SHADERTEST: call <2 x float> @llvm.amdgcn.raw.buffer.load.v2f32(<4 x i32> {{%[^,]+}}, i32 16, i32 0, i32 0)
; SHADERTEST: call float @llvm.amdgcn.raw.buffer.load.f32(<4 x i32> {{%[^,]+}}, i32 24, i32 0, i32 0)
; SHADERTEST: call void @llvm.amdgcn.raw.buffer.store.v2f32(<2 x float> {{%[^,]+}}, <4 x i32> {{%[^,]+}}, i32 16, i32 0, i32 0)
; SHADERTEST: call void @llvm.amdgcn.raw.buffer.store.f32(float {{%[^,]+}}, <4 x i32> {{%[^,]+}}, i32 24, i32 0, i32 0)
; SHADERTEST: call <4 x float> @llvm.amdgcn.raw.buffer.load.v4f32(<4 x i32> {{%[^,]+}}, i32 32, i32 0, i32 0)
; SHADERTEST: call void @llvm.amdgcn.raw.buffer.store.v4f32(<4 x float> {{%[^,]+}}, <4 x i32> {{%[^,]+}}, i32 32, i32 0, i32 0)

; SHADERTEST: AMDLLPC SUCCESS
*/
// END_SHADERTEST
