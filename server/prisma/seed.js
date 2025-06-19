const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.kudosCard.deleteMany({});
    await prisma.board.deleteMany({});

    // Create boards with their cards
    // console.log('Creating boards and cards...');
    const boards = [
      {
        title: "Thank You Development Team!",
        description: "A space to appreciate our amazing dev team's hard work",
        category: "thank-you",
        author: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
        cards: [
          {
            title: "Outstanding Code Review Support",
            description: "Thank you for taking the time to thoroughly review my PRs and helping me improve my code quality!",
            author: "John Smith",
            image: "https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif"
          },
          {
            title: "Above and Beyond Support",
            description: "You stayed late to help debug that critical issue. Really appreciate your dedication!",
            author: "Emily Chen",
            image: "https://media.giphy.com/media/LSX5dYGZJ2Z7fy9uFF/giphy.gif"
          },
          {
            title: "Great Mentorship",
            description: "Thanks for patiently explaining the architecture and helping me understand the codebase better.",
            author: "Mike Wilson",
            image: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
          }
        ]
      },
      {
        title: "Celebrating Our Support Champions",
        description: "Recognizing the incredible work of our support team",
        category: "celebration",
        author: "Alex Chen",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
        cards: [
          {
            title: "Amazing Customer Feedback",
            description: "The customer specifically mentioned how helpful and patient you were in resolving their issue!",
            author: "David Kumar",
            image: "https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif"
          },
          {
            title: "Record Response Time",
            description: "Your quick and effective responses have made such a difference to our customer satisfaction!",
            author: "Rachel Zhou",
            image: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif"
          },
          {
            title: "Going Above and Beyond",
            description: "Thank you for handling that difficult situation with such professionalism and care.",
            author: "Sam Peterson",
            image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
          }
        ]
      },
      {
        title: "Inspiring Design Excellence",
        description: "Celebrating our design team's creative inspiration",
        category: "inspiration",
        author: "Lisa Park",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80",
        cards: [
          {
            title: "Design Innovation",
            description: "Your fresh perspective on the homepage redesign has inspired us all to think differently!",
            author: "Tom Anderson",
            image: "https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif"
          },
          {
            title: "Creative Problem Solving",
            description: "The way you approached the mobile navigation challenge was truly inspiring.",
            author: "Nina Patel",
            image: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
          },
          {
            title: "Design Leadership",
            description: "Your presentation on design systems was so motivating. You're really leading by example!",
            author: "Chris Lee",
            image: "https://media.giphy.com/media/LSX5dYGZJ2Z7fy9uFF/giphy.gif"
          }
        ]
      },
      {
        title: "Thank You Product Team!",
        description: "Showing appreciation for our product team's dedication",
        category: "thank-you",
        author: "Mark Thompson",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
        cards: [
          {
            title: "Great Product Vision",
            description: "Thank you for always keeping user needs at the forefront of our decisions.",
            author: "Sophia Chen",
            image: "https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif"
          },
          {
            title: "Excellent Stakeholder Management",
            description: "Your ability to balance different stakeholder needs is truly appreciated!",
            author: "James Wilson",
            image: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif"
          },
          {
            title: "User-Centric Approach",
            description: "Thanks for always advocating for our users and pushing for better experiences.",
            author: "Emma Davis",
            image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
          }
        ]
      },
      {
        title: "Celebrating Q1 Success",
        description: "Recognizing our team's amazing achievements",
        category: "celebration",
        author: "Jennifer Adams",
        image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80",
        cards: [
          {
            title: "Milestone Achievement",
            description: "We couldn't have hit our Q1 goals without everyone's dedication and hard work!",
            author: "Robert Kim",
            image: "https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif"
          },
          {
            title: "Team Spirit",
            description: "The way everyone came together to meet our deadlines was incredible!",
            author: "Laura Martinez",
            image: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
          },
          {
            title: "Innovation Success",
            description: "Celebrating the successful launch of our new features. Great job team!",
            author: "Daniel Brown",
            image: "https://media.giphy.com/media/LSX5dYGZJ2Z7fy9uFF/giphy.gif"
          }
        ]
      },
      {
        title: "Inspiring Leadership Moments",
        description: "Highlighting inspiring actions from our leaders",
        category: "inspiration",
        author: "Michelle Lee",
        image: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&q=80",
        cards: [
          {
            title: "Leading by Example",
            description: "Your handling of the recent challenges has shown us what great leadership looks like.",
            author: "Kevin Wang",
            image: "https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif"
          },
          {
            title: "Motivational Guidance",
            description: "Your words in the team meeting really inspired us to push through difficulties.",
            author: "Sarah Miller",
            image: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif"
          },
          {
            title: "Vision and Direction",
            description: "The way you've outlined our path forward has given everyone clear purpose and motivation.",
            author: "Jack Thompson",
            image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
          }
        ]
      },
      {
        title: "Thank You Marketing Heroes",
        description: "Appreciating our marketing team's brilliant work",
        category: "thank-you",
        author: "Ryan Cooper",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
        cards: [
          {
            title: "Creative Excellence",
            description: "Thank you for making our brand shine with your creative campaigns!",
            author: "Anna Kim",
            image: "https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif"
          },
          {
            title: "Content Magic",
            description: "Your content strategy has really elevated our brand voice. Thank you!",
            author: "Peter Chang",
            image: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
          },
          {
            title: "Social Media Wizardry",
            description: "Thanks for managing our social presence with such skill and engagement.",
            author: "Maria Garcia",
            image: "https://media.giphy.com/media/LSX5dYGZJ2Z7fy9uFF/giphy.gif"
          }
        ]
      },
      {
        title: "Celebrating Customer Success",
        description: "Recognizing exceptional customer success achievements",
        category: "celebration",
        author: "David Wilson",
        image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80",
        cards: [
          {
            title: "Client Satisfaction Champion",
            description: "Your dedication to ensuring client success has been remarkable!",
            author: "Linda Chen",
            image: "https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif"
          },
          {
            title: "Relationship Building",
            description: "The trust you've built with our key accounts is truly worth celebrating.",
            author: "Michael Park",
            image: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif"
          },
          {
            title: "Problem Solving Excellence",
            description: "Your proactive approach to client needs has made such a difference!",
            author: "Sophie Taylor",
            image: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
          }
        ]
      },
      {
        title: "Inspiring Innovation Stories",
        description: "Sharing inspiring moments of innovation across teams",
        category: "inspiration",
        author: "Emma Rodriguez",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
        cards: [
          {
            title: "Creative Problem Solving",
            description: "Your innovative solution to the performance issue was truly inspiring!",
            author: "Jason Lee",
            image: "https://media.giphy.com/media/3oz8xAFtqoOUUrsh7W/giphy.gif"
          },
          {
            title: "Forward Thinking",
            description: "Your ideas about future product direction have inspired the whole team.",
            author: "Rachel Kim",
            image: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
          },
          {
            title: "Innovation Leadership",
            description: "The way you encourage experimentation and learning inspires us all.",
            author: "Alex Martinez",
            image: "https://media.giphy.com/media/LSX5dYGZJ2Z7fy9uFF/giphy.gif"
          }
        ]
      }
    ];

    for (const boardData of boards) {
      const { cards, ...boardInfo } = boardData;
      console.log(`Creating board: ${boardInfo.title}`);

      const board = await prisma.board.create({
        data: {
          ...boardInfo,
          cards: {
            create: cards
          }
        },
        include: {
          cards: true
        }
      });

      console.log(`Created board ${board.id} with ${board.cards.length} cards`);
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
