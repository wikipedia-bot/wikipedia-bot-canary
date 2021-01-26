import { Snowflake } from 'slash-commands';

interface InteractionType {
  InteractionType: number;
}

interface GuildMember {
  user: {
    username: string;
    public_flags: string;
    id: Snowflake;
    discriminator: string;
    avatar: string;
  };
  roles: string[];
  premium_since: string;
  permissions: string;
  pending: boolean;
  nick: string;
  mute: boolean;
  joined_at: Date;
  is_pending: boolean;
  deaf: boolean;
}

interface ApplicationCommandInteractionDataOption {
  name: string;
  value?: unknown;
  options?: Record<string, unknown>;
}

interface ApplicationCommandInteractionData {
  id: Snowflake;
  name: string;
  options?: ApplicationCommandInteractionDataOption[];
}

export interface interaction {
  id: Snowflake;
  type: InteractionType; // InteractionType (1-2)
  token: string;
  guild_id: string;
  channel_id: string;
  member: GuildMember;
  data?: ApplicationCommandInteractionData;
}
