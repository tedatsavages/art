//


osc(2, .072,.65).//pixelate(20,5)
rotate(0.8).modulateRotate(noise(()=>.00185*time%50,()=>.00006*time%50000))
//.thresh(0.2,0.5)
//.pixelate(23,23)
.blend(osc(3.14159/2, .02,.25)
//.pixelate(16,5)
.rotate(5).modulateRotate(noise(()=>.00185*time%50,()=>.00006*(time%50000)))
.pixelate(16,15)
,1)
.modulateScale(voronoi(()=>mouse.x/5.95,0.43,0.5)
//.pixelate(40,40)
,2)
.saturate(2)
.scale(1,1,()=>window.innerWidth/window.innerHeight).out()
