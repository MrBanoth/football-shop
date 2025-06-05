import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden rounded-xl mb-12">
        <Image
          src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg"
          alt="Football stadium"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="max-w-xl p-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Our Story
            </h1>
            <p className="text-xl text-white/90">
              Dedicated to football excellence since 2010
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            Founded by former professional players, GoalGear was born from a passion for the beautiful game and a desire to provide athletes with equipment that enhances their performance on the pitch.
          </p>
          <p className="text-muted-foreground mb-4">
            Our mission is simple: to offer premium quality football gear that meets the needs of players at every level, from weekend warriors to seasoned professionals. We believe that the right equipment can make a significant difference in a player's confidence, comfort, and ultimately, their performance.
          </p>
          <p className="text-muted-foreground">
            We work directly with manufacturers who share our commitment to quality and sustainability, ensuring that every product that bears the GoalGear name meets our exacting standards.
          </p>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg"
            alt="Football pitch"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Why Football Section */}
      <div className="bg-muted/30 rounded-xl p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Football?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">The World's Game</h3>
            <p className="text-muted-foreground">
              Football transcends borders, languages, and cultures, bringing people together through a shared love of the game. We're proud to be part of this global community.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Physical Excellence</h3>
            <p className="text-muted-foreground">
              Football demands agility, endurance, and precision. We design our products to help players reach their physical potential and perform at their best.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Team Spirit</h3>
            <p className="text-muted-foreground">
              Few sports exemplify teamwork like football. Our products foster a sense of unity and belonging, whether you're playing for your local club or supporting your favorite team.
            </p>
          </div>
        </div>
      </div>

      {/* Team Story */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Rodriguez",
              role: "Founder & CEO",
              image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
              bio: "Former professional player with 15 years of experience in product development for major sporting brands."
            },
            {
              name: "Sarah Johnson",
              role: "Head of Design",
              image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
              bio: "Award-winning designer who has created equipment for national teams and major tournaments worldwide."
            },
            {
              name: "Marcus Chen",
              role: "Quality Assurance",
              image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
              bio: "Sports science expert ensuring all GoalGear products meet rigorous performance and durability standards."
            },
          ].map((member, index) => (
            <div key={index} className="bg-card rounded-xl overflow-hidden">
              <div className="relative h-80">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the GoalGear Family</h2>
        <p className="max-w-xl mx-auto mb-6">
          Experience the difference that premium football equipment can make to your game. Browse our collection and elevate your performance today.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/shop">Shop Our Collection</Link>
        </Button>
      </div>
    </div>
  );
}