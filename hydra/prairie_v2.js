// The Gateway To Jones Beach
//by Ted Pallas
// Nov 11 2021

osc(12, .082, .65)
.pixelate(20,5)
.rotate(()=>time*.125)
.modulateScale(noise(()=>.0015*time%50,()=>.000006*time%50000))
.scale(1,1,()=>window.innerWidth/window.innerHeight)
.modulateRotate(o0, 0.085)
.blend(o0, .495)
.scrollY(.0001)
.scale(0.9965)
.invert(1)
.luma(.25)
.modulateScale(voronoi(10,.125,0),6)
.scale(1,1,()=>window.innerWidth/window.innerHeight)
.saturate(2)
.out()
