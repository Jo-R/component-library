
I've had quite a few stop-starts on personal projects recently. I keep starting to build web apps which are not entirely dissimilar to what I do at work and I lose interest pretty quickly, plus I often feel like I need to spend my free time doing non-computer based things. I was also finding that when a chunk of time had passed sinced I last worked on something that I'd lost track of where I was with it and it felt too hard to pick it up again (considering this was meant to be fun stuff, not work). So I've been on the lookout for a project that I can pick up and put down, that has some pretty discrete steps and that would also (of course) offer plenty of learning. I happened to end up on the wai-aria authoring practices page the other day and it clicked...create a library of components, one for each of the design patterns/widgets listed in the authoring practices that conform to those standards. 

I'm not planning on creating something production ready but it will be great to have a resource for myself to refer to where I've implemented each of these. I briefly toyed with doing them in vanilla html/css/js but in the end went for React (but jsx not tsx), and I'll just use Storybook to view them rather than using them in an actual app (so bonus, get to learn more about Storybook). Figure I can also create some tests and get some practice there.

Another thing I wanted to do was write some more so I'm going to record some things I learn from creating each component.

Since this was also the project setup...
- that storybook 6 is out and its got some pretty cool features
- there's an a11y add on
- and react-icons is also pretty great (thanks to Sarah Viera's book for awareness of that)

Doing the actual accordion...
- aria-controls
- how to create refs for a dynamic number of children and access them in the parent

