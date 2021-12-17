outVel = myVel;

int pNum;
PAR.GetNumParticles(pNum);

for(int i=0; i<pNum; i++){
  bool myBool;

  float3 OtherPos;
  PAR.GetVectorByIndex<Attribute="Position">(i, myBool, OtherPos);

  float3 OtherScale;
  PAR.GetVectorByIndex<Attribute="Scale">(i, myBool, OtherScale);

  float3 localVec = OtherPos - myPos;
  float vecSqr = dot(localVec,localVec);
  float rSq = myScale.x + OtherScale.x;
  rSq *= rSq;

  float3 nrmLocalVec = normalize(localVec);

  if (vecSqr < rSq && vecSqr > 0.01f) {
    outVel = myVel - 2.0f * (-nrmLocalVec) * dot(myVel, -nrmLocalVec);

  }
}
