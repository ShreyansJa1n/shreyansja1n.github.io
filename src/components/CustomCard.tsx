import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CustomCardProps {
  title: string;
  description: string;
  tags?: string[];
  buttonText?: string;
  buttonLink?: string;
  darkMode: boolean;
  icon?: ReactNode;
}

export const CustomCard = ({
  title,
  description,
  tags = [],
  buttonText,
  buttonLink,
  darkMode,
  icon
}: CustomCardProps) => (
  <Card
    className={`flex flex-col rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'}`}
  >
    <CardHeader>
      <CardTitle className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>{title}</CardTitle>
    </CardHeader>
    <CardContent className={`flex flex-col flex-1 justify-between ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl`}>
      <div className="flex flex-col flex-1">
        <div className="min-h-[72px]">
          <CardDescription className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{description}</CardDescription>
        </div>
        {tags.length > 0 && (
          <div className="min-h-[40px] mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
            {tags.length > 6 && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                +{tags.length - 6} more
              </span>
            )}
          </div>
        )}
      </div>
      {buttonText && buttonLink && (
        <div className="flex gap-3 mt-6">
          <Button asChild className={`${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'} transition-colors duration-300 w-full`}>
            <Link to={buttonLink}>
              {icon} {buttonText}
            </Link>
          </Button>
        </div>
      )}
    </CardContent>
  </Card>
);
