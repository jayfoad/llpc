#version 450

layout(binding = 0) uniform Uniforms
{
    float f1_1;
    vec3 f3_1;
};

layout(location = 0) out vec4 fragColor;

void main()
{
    float f1_0 = sign(f1_1);

    vec3 f3_0 = sign(f3_1);

    fragColor = ((f1_0 != f3_0.x)) ? vec4(0.0) : vec4(1.0);
}
// BEGIN_SHADERTEST
/*
; RUN: amdllpc -spvgen-dir=%spvgendir% -v %gfxip %s | FileCheck -check-prefix=SHADERTEST %s
; SHADERTEST-LABEL: {{^// LLPC}} SPIRV-to-LLVM translation results
; SHADERTEST: = call reassoc nnan nsz arcp contract float (...) @llpc.call.fsign.f32(float
; SHADERTEST: = call reassoc nnan nsz arcp contract <3 x float> (...) @llpc.call.fsign.v3f32(<3 x float>
; SHADERTEST-LABEL: {{^// LLPC}} SPIR-V lowering results
; SHADERTEST: %{{[0-9]*}} = fcmp reassoc nnan nsz arcp contract ogt float %{{.*}}, 0.000000e+00
; SHADERTEST: %{{[0-9]*}} = fcmp reassoc nnan nsz arcp contract ogt float %{{.*}}, 0.000000e+00
; SHADERTEST: %{{[0-9]*}} = fcmp reassoc nnan nsz arcp contract oge float %{{.*}}, 0.000000e+00
; SHADERTEST: %{{[0-9]*}} = fcmp reassoc nnan nsz arcp contract oge float %{{.*}}, 0.000000e+00
; SHADERTEST: AMDLLPC SUCCESS
*/
// END_SHADERTEST
