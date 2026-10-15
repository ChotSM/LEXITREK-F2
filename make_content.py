import json,ctypes,ctypes.util,subprocess
from pathlib import Path
ROOT=Path(__file__).parent
units=[(1,'Everyday adventures','Leisure and abilities','spark','Free-time activities and skills'),(2,'People and stories','Literature and professions','book','Books and people at work'),(3,'Weather watch','Weather and natural disasters','sun','Weather and safety'),(4,'Life on Earth','Places and wildlife','leaf','Geography, landscapes and animals'),(5,'Discovery lab','Science and classroom science','flask','Science and discovery')]
# Original explanations and practice sentences. Curriculum candidates; textbook pages pending.
entries={
1:[
('cook','To prepare food for eating.','memasak','I help my father _____ rice for dinner.','We _____ vegetables in the kitchen.','I can cook a simple meal.','🍳','verb'),
('draw','To make a picture with a pencil or pen.','melukis','Please _____ a picture of your house.','I use a pencil to _____ an animal.','I like to draw after school.','✏️','verb'),
('dance','To move your body to music.','menari','We _____ when our favourite music plays.','They like to _____ at the celebration.','My friends dance together.','💃','verb'),
('sing','To make music with your voice.','menyanyi','We _____ a song at the school concert.','The children _____ together in the classroom.','I can sing this song.','🎤','verb'),
('tell jokes','To say funny things to make people laugh.','bercerita jenaka','My friends laugh when I _____.','I like to _____ to make my brother laugh.','I tell jokes to my friends.','😄','phrase'),
('listen to music','To pay attention to songs or other musical sounds.','mendengar muzik','I use headphones to _____.','After school, we _____ on the radio.','I listen to music on the bus.','🎧','phrase'),
('play volleyball','To take part in a team game using a ball and a high net.','bermain bola tampar','Our teams _____ over a high net.','We use our hands to hit the ball when we _____.','We play volleyball after school.','🏐','phrase'),
('bake a cake','To make a sweet food mixture and cook it in an oven.','membakar kek','For her birthday, we will _____.','I mix flour and eggs before I _____.','I can bake a cake with my mother.','🎂','phrase')],
2:[
('writer','A person who writes books, stories or other texts.','penulis','The _____ wrote a new story for children.','A _____ puts ideas into words for readers.','The writer visits our school.','📖','noun'),
('adventure story','A story about exciting journeys or unusual experiences.','cerita pengembaraan','This _____ tells us about an exciting journey.','We read an _____ about a dangerous trip.','I enjoy an adventure story about explorers.','📚','noun phrase'),
('pilot','A person who flies an aircraft.','juruterbang','The _____ flies the plane to Kuching.','A _____ controls an aircraft in the sky.','The pilot lands the plane safely.','✈️','noun'),
('engineer','A person who designs or builds things such as machines or bridges.','jurutera','The _____ designs a new bridge.','An _____ helps to build safe machines.','The engineer checks the bridge.','⚙️','noun'),
('fairy tale','A story that often includes magic and imaginary characters.','cerita dongeng','The _____ has a magic castle and talking animals.','We read a _____ about a magical world.','This fairy tale has a happy ending.','🏰','noun phrase'),
('musician','A person who plays music or creates it.','pemuzik','The _____ plays a guitar on stage.','A _____ practises music every day.','My sister wants to be a musician.','🎸','noun'),
('travel guide','A book that gives information about places to visit.','buku panduan perjalanan','We use a _____ to choose places to visit.','The _____ gives visitors information about the city.','My travel guide shows places in Sarawak.','🗺️','noun phrase'),
('poetry book','A book containing poems.','buku puisi','This _____ contains many short poems.','I choose a _____ because I enjoy reading poems.','There is a poem about rain in my poetry book.','📖','noun phrase')],
3:[
('windy','With a lot of moving air.','berangin','Hold your hat: it is _____ outside.','The leaves move quickly on this _____ day.','It is windy near the beach.','🍃','adjective'),
('sunny','With bright light from the sun.','cerah','There are no clouds on this _____ morning.','We wear hats on a bright, _____ day.','It is sunny today.','☀️','adjective'),
('cloudy','With many clouds in the sky.','berawan','We cannot see the sun because it is _____.','The sky is grey on this _____ afternoon.','It is cloudy above the hills.','☁️','adjective'),
('rainy','With a lot of rain.','hujan','Take an umbrella on this _____ day.','Water falls from the sky during the _____ season.','I wear a raincoat on rainy days.','🌧️','adjective'),
('stormy','With strong wind and usually heavy rain.','ribut','Strong wind and heavy rain make the weather _____.','We stay inside during this _____ evening.','It is too stormy to walk outside.','⛈️','adjective'),
('foggy','With thick mist that makes it hard to see.','berkabus','Drivers cannot see far on a _____ road.','The hills disappear in the mist on this _____ morning.','It is foggy in the hills.','🌫️','adjective'),
('flood','Water that covers land which is usually dry.','banjir','Heavy rain caused a _____ in the town.','A _____ covered the road with water.','The flood covered the field.','🌊','noun'),
('earthquake','A sudden shaking of the ground.','gempa bumi','The ground shook during the _____.','An _____ can make buildings shake.','The earthquake shook the town.','🏚️','noun')],
4:[
('forest','A large area of land with many trees.','hutan','Many trees grow together in the _____.','Birds live among the trees in the _____.','We walk along a forest path.','🌳','noun'),
('mountain','A very high area of land rising above the land around it.','gunung','The climbers walked to the top of the _____.','The _____ is much higher than the small hills.','The mountain is covered in cloud.','🏔️','noun'),
('river','A long flow of water across the land.','sungai','The boat moves along the _____.','The _____ flows from the hills to the sea.','A river flows past the village.','🏞️','noun'),
('island','An area of land with water all around it.','pulau','We take a boat to an _____ in the sea.','Water surrounds the _____ on every side.','They live on a small island.','🏝️','noun'),
('lake','A large area of water surrounded by land.','tasik','We sit beside a _____ surrounded by hills.','The boat crosses the quiet _____ inside the park.','Fish swim in the lake.','💧','noun'),
('desert','A very dry area of land with little rain.','gurun','Very little rain falls in the _____.','Few plants grow in this dry _____.','The desert is dry and sandy.','🏜️','noun'),
('bee','A small flying insect that visits flowers and can make honey.','lebah','A _____ flies from one flower to another.','The _____ carries pollen from a flower.','A bee visits the yellow flower.','🐝','noun'),
('owl','A bird with large eyes that often hunts at night.','burung hantu','An _____ with large eyes watches the dark forest.','The _____ hunts for food at night.','An owl sits in the tree.','🦉','noun')],
5:[
('battery','An object that stores energy and gives power to a device.','bateri','The torch needs a new _____.','A _____ gives power to this small device.','Put a battery in the torch.','🔋','noun'),
('planet','A large round object in space that travels around a star.','planet','Earth is a _____ that moves around the Sun.','A _____ travels around a star in space.','Our planet is Earth.','🪐','noun'),
('air','The mixture of gases around us that we breathe.','udara','We breathe _____ through our nose.','Moving _____ makes the leaves blow.','We need clean air to breathe.','💨','noun'),
('gas','A substance that spreads out to fill the space around it.','gas','Air is a mixture of different types of _____.','The _____ spreads to fill its container.','We learn about gas in science.','🫧','noun'),
('liquid','A substance that flows and takes the shape of its container.','cecair','Water is a _____ that we can pour.','This _____ flows from the jug into the glass.','Milk is a liquid.','🧪','noun'),
('temperature','A measure of how hot or cold something is.','suhu','The thermometer measures the _____.','We check the _____ to know how hot the water is.','The temperature is rising.','🌡️','noun'),
('gravity','The force that pulls things towards Earth or another large object.','graviti','_____ pulls the falling ball towards the ground.','Objects fall to Earth because of _____.','Gravity pulls the apple down.','🍎','noun'),
('laboratory','A room where people do scientific work and experiments.','makmal','We do our science experiment in the _____.','Scientists work carefully in the _____.','Wear safety glasses in the laboratory.','🔬','noun')]
}
words=[]
for un,rows in entries.items():
 for i,(word,meaning,bm,s1,s2,example,emoji,pos) in enumerate(rows):
  words.append(dict(id=f'u{un}-{i+1}',unit=un,word=word,meaning=meaning,translation=bm,sentences=[s1,s2],example=example,emoji=emoji,pos=pos,audio=f'audio/u{un}-{i+1}.mp3',source='Form 1 syllabus vocabulary domain; Pulse 2 page verification pending',cefr='A2-oriented task design; individual word level not certified'))
pack=dict(id='pulse2-form1-pilot',version='1.0.0',status='provisional',title='Pulse 2 aligned • Form 1',target='A2 Mid Revised',units=[dict(id=u,title=t,subtitle=s,icon=i,domain=d) for u,t,s,i,d in units],words=words)
(ROOT/'dist'/'content.json').write_text(json.dumps(pack,ensure_ascii=False,indent=2))
f=ctypes.CDLL(ctypes.util.find_library('flite'),mode=ctypes.RTLD_GLOBAL);v=ctypes.CDLL(ctypes.util.find_library('flite_cmu_us_slt'));f.flite_init()
v.register_cmu_us_slt.argtypes=[ctypes.c_char_p];v.register_cmu_us_slt.restype=ctypes.c_void_p;voice=v.register_cmu_us_slt(None)
f.flite_text_to_speech.argtypes=[ctypes.c_char_p,ctypes.c_void_p,ctypes.c_char_p];f.flite_text_to_speech.restype=ctypes.c_float
(ROOT/'dist'/'audio').mkdir(exist_ok=True)
for w in words:
 wav=ROOT/'test-voice.wav';f.flite_text_to_speech(w['word'].encode(),voice,str(wav).encode())
 subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','48k',str(ROOT/'dist'/w['audio'])],check=True)
if (ROOT/'test-voice.wav').exists():(ROOT/'test-voice.wav').unlink()
print('Created',len(words),'original vocabulary cards and offline pronunciation files')
