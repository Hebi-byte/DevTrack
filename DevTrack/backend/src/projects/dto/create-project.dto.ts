import { IsArray, IsDateString, IsIn, IsInt, IsOptional, IsString, IsUrl, Max, Min, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  @IsIn(['Web Development', 'Mobile App', 'UI/UX Design', 'Data & AI', 'Other'])
  category: string;

  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @IsString()
  @IsIn(['Planning', 'In Progress', 'Completed', 'On Hold'])
  status: string;

  @IsInt()
  @Min(0)
  @Max(100)
  progress: number;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsUrl()
  githubUrl?: string;
}
