export default function OperatorDialogue({ profileVoice }: { profileVoice: any }) {
  return (
    <div className="bg-muted dark:bg-card rounded-lg shadow-sm p-4">
      <ul className="space-y-4">
        {profileVoice.map((voice: any, idx: number) => (
          <li className="flex flex-col" key={idx}>
            <span className="font-semibold">{voice.voiceTitle}</span>
            <span className="text-muted-foreground">{voice.voiceDesc}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}