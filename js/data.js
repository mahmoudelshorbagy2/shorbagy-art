const SITE_DATA = {
  hero: {
    en: {
      name: "Mahmoud Elshorbagy",
      subtitle: "Art Education Teacher",
      tagline: "Bridging Technical Mastery with Creative Expression"
    },
    ar: {
      name: "محمود الشوربجي",
      subtitle: "مدرس تربية فنية",
      tagline: "نحوّق بين الإتقان التقني والتعبير الإبداعي"
    }
  },
  about: {
    en: {
      title: "About Me",
      body: "Teaching is where my real passion lives — sharing knowledge and skill with students in a way that's clear, engaging, and easy to connect with. I believe a great educator isn't just someone who has mastered a craft, but someone who can break it down patiently and make every student feel capable of creating. I'm committed to constantly growing as a teacher, refining how I explain, demonstrate, and connect with students of every background and learning style. My training spans a wide range of fine arts, heritage crafts, and contemporary design — from drawing and ceramics to textiles, woodwork, and mixed media — giving me a versatile toolkit I draw on to reach every kind of learner and build a classroom where curiosity and confidence grow together."
    },
    ar: {
      title: "نبذة عني",
      body: "شغفي الحقيقي هو التدريس؛ إني أقدر أوصّل المعرفة والمهارة للطلاب بأسلوب واضح وشيّق يخليهم يحبوا التعلم. بؤمن إن المعلم الحقيقي مش بس اللي بيتقن الفن، لكن اللي بيقدر يبسّطه ويوصّله بصبر، ويخلّي كل طالب يحس إنه قادر على الإبداع. باهتم دايمًا بتطوير نفسي كمعلم، وتحسين أسلوبي في الشرح والتفاعل مع الطلاب باختلاف مستوياتهم وطرق تفكيرهم. تدرّبت على نطاق واسع من الفنون التشكيلية والحرف التراثية والتصميم المعاصر، من الرسم والخزف إلى النسيج والنجارة والوسائط المختلطة، وده بيديني أدوات متنوعة أقدر استخدمها عشان أوصل لكل أنواع المتعلمين، وأبني فصل دراسي قائم على الفضول والثقة بالنفس."
    }
  },
  vision: {
    en: {
      title: "The Educator's Vision",
      subtitle: "Bridging Technical Mastery with Creative Expression",
      body: "Empowering students through a multi-disciplinary approach to fine arts, heritage crafts, and contemporary design. True art education requires moving beyond simple self-expression; it demands the cultivation of spatial reasoning, cultural empathy, and the fine motor discipline necessary to bring complex visions to life."
    },
    ar: {
      title: "رؤية المعلّم",
      subtitle: "نحوّق بين الإتقان التقني والتعبير الإبداعي",
      body: "تمكين الطلاب من خلال منهجية متعددة التخصصات في الفنون التشكيلية والحرف التراثية والتصميم المعاصر. يتطلب التعليم الفني الحقيقي تجاوز التعبير الذاتي البسيط؛ بل يستوجب تنمية التفكير المكاني والتعاطف الثقافي وانضباط المهارات الحركية الدقيقة اللازمة لتحويل الرؤى المعقدة إلى واقع ملموس."
    }
  },
  artworks: [
    {
      id: "artwork-01",
      en: {
        title: "Foundations of Observation",
        objective: "Translating three-dimensional realities into two-dimensional representations.",
        techniques: "Developing strict observational skills, mastering chiaroscuro (light and shadow), and understanding geometric underpinnings in everyday objects.",
        benefit: "Builds the essential hand-eye coordination and spatial awareness required before advancing to color and mixed media."
      },
      ar: {
        title: "أسس الملاحظة",
        objective: "تحويل الواقع ثلاثي الأبعاد إلى تمثيلات ثنائية البُعد.",
        techniques: "تنمية مهارات الملاحظة الصارمة، وإتقان تقنية الشيروسكرو (الظل والنور)، وفهم الأساس الهندسية في الأشياء اليومية.",
        benefit: "يُبني تنسيق العين واليد والوعي المكاني الأساسيين المطلوبين قبل الانتقال إلى اللون والوسائط المختلعة."
      }
    },
    {
      id: "artwork-02",
      en: {
        title: "Landscape & Natural Observation",
        objective: "Training students to really look at nature — how light shifts across a field, how color softens and cools with distance, and how a single tree can anchor an entire composition.",
        techniques: "Layered color blocking for atmospheric depth, tonal gradation from foreground to horizon, and expressive brushwork to capture natural textures like foliage and grass.",
        benefit: "Students build patience and observational discipline, learning to translate the calm and scale of open nature onto canvas — and grow a quieter, more attentive relationship with the world around them."
      },
      ar: {
        title: "المناظر الطبيعية والملاحظة البصرية",
        objective: "تدريب الطلاب إزاي يلاحظوا الطبيعة بعمق؛ إزاي الضوء بيتغير على المساحات الواسعة، وإزاي الألوان بتخف وتبرد كل ما بعدت المسافة، وإزاي شجرة واحدة ممكن تكون مركز اللوحة كلها.",
        techniques: "طبقات لونية لخلق عمق جوي، وتدرج تدريجي من المقدمة للأفق، وضربات فرشاة تعبيرية لإظهار ملامس طبيعية زي العشب وأوراق الشجر.",
        benefit: "الطلاب بيبنوا صبر ودقة ملاحظة، ويتعلموا إزاي ينقلوا هدوء واتساع الطبيعة على الكانفاس، وبيكتسبوا علاقة أهدى وأكتر انتباهًا بالعالم من حواليهم."
      }
    },
    {
      id: "artwork-03",
      en: {
        title: "Color Theory & Historical Emulation",
        objective: "Deconstructing famous art movements through active, hands-on recreation.",
        techniques: "Cubist fractioning of perspective versus Expressionist color blocking and atmospheric tone.",
        benefit: "Students move beyond memorizing art history to actually internalizing the decision-making processes of master painters."
      },
      ar: {
        title: "نظرية اللون والمحاكاة التاريخية",
        objective: "تفكيك حركات الفن الشهيرة من خلال إعادة إبداع عملية وتفاعلية.",
        techniques: "التكسير التكعيبي للمنظور مقابل كتل اللون التعبيرية والنبرات الجوية.",
        benefit: "يتجاوز الطلاب حفظ تاريخ الفن إلى استيعاب عمليات اتخاذ القرار لدى الرسامين الكبار."
      }
    },
    {
      id: "artwork-04",
      en: {
        title: "Cultural Heritage & Precision Scaffolding",
        objective: "Utilizing national heritage to inspire deep classroom engagement.",
        techniques: "Advanced brush control, high-contrast color theory, and disciplined pattern repetition.",
        benefit: "By breaking down a daunting, intricate portrait into manageable structural steps, students develop both extreme patience and immense cultural pride upon completion."
      },
      ar: {
        title: "التراث الثقافي والبنية الدقيقة",
        objective: "استخدام التراث الوطني لإلهام المشاركة العميقة في الفصل الدراسي.",
        techniques: "تحكم متقدم في الفرشاة، ونظرية اللون عالي التباين، وتكرار الأنماط بانضباط.",
        benefit: "من خلال تفكيك صورة معقدة مرعبة إلى خطوط هيكلية قابلة للإدارة، يكتسب الطلاب صبراً شديداً وفخراً ثقافياً هائلاً عند الإنجاز."
      }
    },
    {
      id: "artwork-05",
      en: {
        title: "Atmospheric Landscapes & Emotion",
        objective: "Exploring mood and environmental storytelling through color temperature.",
        techniques: "Mastering watercolor/acrylic gradients, wash techniques, and atmospheric perspective.",
        benefit: "Provides a vital outlet for emotional expression, teaching students how color palettes directly manipulate the viewer's psychological response."
      },
      ar: {
        title: "المناظر الطبيعية الجوية والعواطف",
        objective: "استكشاف المزاج والسرد البيئي من خلال درجة حرارة اللون.",
        techniques: "إتقان تدرجات الأكواريل الأكريليك، وتقنيات الغسيل، والمنظور الجوي.",
        benefit: "يوفر مخرجاً حيوياً للتعبير العاطفي، ويُعلّم الطلاب كيف تتحكم لوحات الألوان مباشرة في الاستجابة النفسية للمشاهد."
      }
    },
    {
      id: "artwork-06",
      en: {
        title: "The Full Composition: Macro Context & Micro Analysis",
        objective: "Learning through upcycling and assemblage, exploring sustainability through creativity.",
        techniques: "Working with recycled materials and found objects to create cohesive artistic compositions.",
        benefit: "Assemblage encourages problem-solving, resourcefulness, and innovation, developing a deeper understanding of texture, composition, and the value of giving new life to old materials."
      },
      ar: {
        title: "التكوين الكامل: السياق الكلي والتحليل الجزئي",
        objective: "التعلم من خلال إعادة التدوير والتجميع، استكشاف الاستدامة عبر الإبداع.",
        techniques: "العمل بمواد معاد تدويرها وأشياء مُعثر عليها لإنشاء تركيبات فنية متماسكة.",
        benefit: "يشجع التجميع على حل المشكلات والابتكار والتجديد، وينمي فهماً أعمق للقوام والتكوين وقيمة إعطاء حياة جديدة للمواد القديمة."
      }
    },
    {
      id: "artwork-07",
      en: {
        title: "The Architecture of Patience: Textile Mathematics",
        objective: "Mapping physical tension to cognitive focus through hand-weaving.",
        techniques: "Hand-weaving requiring the mind to hold mathematical patterns in active memory while executing precise, repetitive motor functions.",
        benefit: "Trains students in pattern recognition, tactile problem solving, and long-term project endurance through complex diagonal and geometric patterns."
      },
      ar: {
        title: "هندسة الصبر: رياضيات النسيج",
        objective: "ربط التوتر المادي بالتركيز المعرفي من خلال النسيج اليدوي.",
        techniques: "النسيج اليدوي الذي يتطلب من العقل الاحتفاظ بالأنماط الرياضية في الذاكرة النشطة أثناء تنفيذ وظائف حركية دقيقة وتكرارية.",
        benefit: "يُدرّب الطلاب على التعرف على الأنماط وحل المشكلات الحسية والتحمّل لمشاريع طويلة الأمد عبر الأنماط المائلة والهندسية المعقدة."
      }
    },
    {
      id: "artwork-08",
      en: {
        title: "Comprehensive Tie-Dye Techniques",
        objective: "Mastering various binding and folding methods to control complex resist-dyeing patterns.",
        techniques: "Horizontal accordion folding, geometric lattice binding, concentric circular tying, and radial pleating.",
        benefit: "Students develop advanced spatial reasoning, enhance their ability to predict intricate physical outcomes, and build immense patience through highly structured, step-by-step processes."
      },
      ar: {
        title: "تقنيات الصبغ الشاملة",
        objective: "إتقان طرق الربط والطي المختلفة للتحكم في أنماط الصبغ المعقدة.",
        techniques: "الطي الأفقي الأكورديوني، والربط الشبكي الهندسي، والربط الدائري المركزي، والطية الإشعاعية.",
        benefit: "يكتسب الطلاب قوة تفكير مكاني متقدمة، ويُحسّنون قدرتهم على التنبؤ بالنتائج الفيزيائية المعقدة، ويبنون صبراً هائلاً من خلال عمليات منظمة ومرتبة خطوة بخطوة."
      }
    },
    {
      id: "artwork-09",
      en: {
        title: "The Anatomy of Form: 3D Visualization",
        objective: "Mastering organic sculpting and structural integrity.",
        techniques: "Clay manipulation, proportion control, and creating deep surface textures.",
        benefit: "Engages tactile learners through unconventional, highly engaging subjects, forcing the brain to reconcile gravity, weight, and balance in real-time."
      },
      ar: {
        title: "تشريح الشكل: التصور ثلاثي الأبعاد",
        objective: "إتقان النحت العضوي والسلامة الهيكلية.",
        techniques: "تعامل الطين، والتحكم في النسب، وإنشاء نسيج سطحي عميق.",
        benefit: "يُشعل حماس المتعلمين الحسيين من خلال مواضيع غير تقليدية وجذابة للغاية، مما يجبر الدماغ على التوفيق بين الجاذبية والوزن والتوازن في الوقت الفعلي."
      }
    },
    {
      id: "artwork-10",
      en: {
        title: "Contemporary Ceramics & Subtractive Relief",
        objective: "Understanding the spectrum between functional pottery and sculptural art.",
        techniques: "Additive modeling (building up form) versus subtractive carving (defining dynamic ridges).",
        benefit: "Develops profound fine motor skills and tactile sensitivity, teaching students how to manipulate form without compromising the structural integrity of the base material."
      },
      ar: {
        title: "الخزف المعاصر والنحت التخفيضي",
        objective: "فهم الطيف بين الفخار الوظيفي والفن التخزيتي.",
        techniques: "النمذجة الإضافية (بناء الشكل) مقابل النحت التخفيضي (تحديد الحدود الديناميكية).",
        benefit: "ينمي مهارات حركية دقيقة عميقة والحساسية الحسية، ويُعلّم الطلاب كيفية التلاعب بالشكل دون المساس بالسلامة الهيكلية للمادة الأساسية."
      }
    },
    {
      id: "artwork-11",
      en: {
        title: "Applied Arts: Precision in Leathercraft",
        objective: "Introducing functional design and heritage material science.",
        techniques: "Leather cutting, specialized tool safety, precise edge stitching, and thematic branding (pyrography/inking).",
        benefit: "Connects art to utility. Students learn extreme patience, the permanence of their physical actions, and how to integrate historical motifs into modern, usable products."
      },
      ar: {
        title: "الفنون التطبيقية: الدقة في عمل الجلود",
        objective: "تقديم التصميم الوظيفي وعلم المواد التراثي.",
        techniques: "قطع الجلد، وسلامة الأدوات المتخصصة، والخياطة الدقيقة للحواف، والعلامة التجارية الموضوعية (الحفر بالحرار/الحبر).",
        benefit: "يربط الفن بالوظيفة. يتعلم الطلاب الصبر الشديد، ودوام أفعالهم المادية، وكيفية دمج الزخارف التاريخية في منتجات حديثة قابلة للاستخدام."
      }
    },
    {
      id: "artwork-12",
      en: {
        title: "Structural Design: Woodwork & Arket",
        objective: "Material science and understanding negative space in rigid media.",
        techniques: "Arket (fretwork) tool mastery, relief carving depth perception, and wood grain analysis.",
        benefit: "Drastically improves hand-eye coordination. Working with rigid materials teaches focus, precision, and the physical mechanics of subtractive design."
      },
      ar: {
        title: "التصميم الهيكلي: النجارة وعمل الأركت",
        objective: "علم المواد وفهم الفراغ السلبي في الوسائط الصلبة.",
        techniques: "إتقان أدوات الأركت (النقوش المنحوتة)، وإدراك عمق النحت البارز، وتحليل حبيبات الخشب.",
        benefit: "يُحسّن بشكل كبير تنسيق العين واليد. العمل مع المواد الصلبة يُعلّم التركيز والدقة والميكانيكا المادية للتصميم التخفيضي."
      }
    },
    {
      id: "artwork-13",
      en: {
        title: "Mixed Media: Intricacy & Mindfulness",
        objective: "Utilizing art as a tool for classroom mindfulness and hyper-focus.",
        techniques: "Radial symmetry, paper quilling tension control, and algorithmic pattern generation.",
        benefit: "Highly structured, repetitive design techniques drastically lower student anxiety, promote sustained concentration spans, and teach the power of color contrast in tight geometries."
      },
      ar: {
        title: "الوسائط المختلعة: التعقيد والوعي",
        objective: "استخدام الفن كأداة للوعي في الفصل والتركيز المفرط.",
        techniques: "التناظر الإشعاعي، والتحكم في توتر لف الورق، وتوليد الأنماط الخوارزمية.",
        benefit: "تقنيات التصميم المنظمة والتكرارية تُخفّض قلق الطلاب بشكل كبير، وتعزز فترات التركيز المستدام، وتُعلّم قوة تباين الألوان في الهندسات الضيقة."
      }
    },
    {
      id: "artwork-14",
      en: {
        title: "Textile Arts & Pattern Design",
        objective: "Introducing fabric and thread as a legitimate design medium, where pattern, texture, and repetition become a language of their own.",
        techniques: "Textile pattern design, fabric manipulation, and mixed-media integration between cloth and other materials.",
        benefit: "Students discover a tactile, wearable form of design — learning how rhythm and repetition in pattern can carry meaning and cultural identity."
      },
      ar: {
        title: "الفنون النسيجية وتصميم الأنماط",
        objective: "تقديم القماش والخيط كوسيط تصميم أصيل، حيث يتحول النمط والملمس والتكرار إلى لغة بصرية قائمة بذاتها.",
        techniques: "تصميم أنماط المنسوجات، والتعامل مع الأقمشة، ودمجها مع وسائط أخرى.",
        benefit: "يكتشف الطلاب شكلاً حسيًا وقابلاً للارتداء من التصميم، ويتعلموا إزاي الإيقاع والتكرار في النمط ممكن يحملوا معنى وهوية ثقافية."
      }
    },
    {
      id: "artwork-15",
      en: {
        title: "Comprehensive Portfolio Synthesis",
        objective: "Bringing every discipline the students trained in together into one cohesive body of work.",
        techniques: "Cross-disciplinary integration — drawing, sculpture, applied crafts, and design brought together under one visual language.",
        benefit: "Students see their own growth laid out in front of them — a tangible record of how each skill built on the one before it."
      },
      ar: {
        title: "تجميع المعرض الشامل",
        objective: "جمع كل التخصصات اللي اتدرب عليها الطلاب في عمل فني واحد متكامل.",
        techniques: "دمج متعدد التخصصات؛ رسم ونحت وحرف تطبيقية وتصميم كلها تحت لغة بصرية واحدة.",
        benefit: "الطلاب بيشوفوا تطورهم بنفسهم قدامهم؛ سجل ملموس لإزاي كل مهارة بنت على اللي قبلها."
      }
    }
  ],
  skillsMatrix: {
    en: {
      title: "Cognitive & Motor Skill Development Matrix",
      closing: "A truly comprehensive art department does not rely on a single medium. It requires a thoughtfully designed approach to reach every kind of student.",
      rows: [
        { domain: "Foundational 2D (Drawing/Painting)", skills: "Spatial Logic, Color Theory, Art History Deconstruction" },
        { domain: "3D Sculpting (Clay/Ceramics)", skills: "Tactile Sensitivity, Structural Integrity, Mass & Gravity Calculation" },
        { domain: "Applied Crafts (Wood/Leather/Metal)", skills: "Functional Design, Tool Safety, Material Resistance, Heritage Appreciation" },
        { domain: "Mixed Media (Textiles/Quilling)", skills: "Differentiated Instruction, Mindfulness, Part-to-Whole Assembly" }
      ]
    },
    ar: {
      title: "مصفوفة تطوير المهارات المعرفية والحركية",
      closing: "لا يعتمد قسم الفنون الشامل حقاً على وسيلة واحدة. بل يتطلب منهجاً مَدْرُوسًا للوصول إلى كل أنواع الطلاب.",
      rows: [
        { domain: "الرسوم ثنائية البُعد (الرسم/اللوحة)", skills: "التفكير المكاني، نظرية اللون، تفكيك تاريخ الفن" },
        { domain: "النحت ثلاثي الأبعاد (الطين/الخزف)", skills: "الحساسية الحسية، السلامة الهيكلية، حساب الكتلة والجاذبية" },
        { domain: "الحرف التطبيقية (خشب/جلد/معدن)", skills: "التصميم الوظيفي، سلامة الأدوات، مقاومة المادة، تقدير التراث" },
        { domain: "الوسائط المختلطة (منسوجات/لف ورق)", skills: "التعليم المُتمايز، الوعي، التجميع من الأجزاء إلى الكل" }
      ]
    }
  },
  contact: {
    en: {
      title: "Get in Touch",
      email: "elshorbagymahmoud8@gmail.com"
    },
    ar: {
      title: "تواصل معي",
      email: "elshorbagymahmoud8@gmail.com"
    }
  },
  social: {
    facebook: "https://www.facebook.com/mahmoud.elshorbagy.395?locale=ar_AR",
    instagram: "https://www.instagram.com/mahmoud_e_elshorbagy/",
    whatsapp: "https://wa.me/201005443671",
    email: "mailto:elshorbagymahmoud8@gmail.com"
  }
};
