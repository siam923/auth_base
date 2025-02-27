"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Import Loader2 from lucide-react

const HeaderSection = ({
  title,
  description,
  actions = null,
  icon: Icon = null,
  loading = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
      px-6 py-5 mb-6 rounded-xl bg-background border
      shadow-sm transition-all duration-200 hover:shadow-md">
      
      {/* Title Section */}
      <div className="flex items-start gap-4 sm:mb-0">
        {Icon && (
          <div className="flex-shrink-0">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Actions Section */}
      {actions && (
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              disabled={loading}
              variant={action.variant || "default"}
              size={action.size || "default"}
              className={`relative ${action.className || ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>{action.loadingText || "Loading..."}</span>
                </>
              ) : (
                <>
                  {action.icon && (
                    <action.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                  )}
                  <span>{action.text}</span>
                </>
              )}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderSection;