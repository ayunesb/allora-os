import { DebateParticipant } from "@/utils/consultation/types";
export default function useDebateParticipants(): {
  participants: DebateParticipant[];
  setParticipants: import("react").Dispatch<
    import("react").SetStateAction<DebateParticipant[]>
  >;
  availableExecutives: any[];
};
