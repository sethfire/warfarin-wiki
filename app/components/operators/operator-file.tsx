import { Separator } from "~/components/ui/separator";

export default function OperatorFile({ profileRecord }: { profileRecord: any }) {
  return (
    <div className="flex flex-col gap-4">
      {profileRecord.map((profile: any, idx: number) => (
        <div className="p-4 bg-muted dark:bg-card rounded-lg shadow-sm" key={idx} style={{ overflowWrap: 'anywhere' }}>
          <h3 className="font-semibold mb-2">{profile.recordTitle}</h3>
          <Separator className="mb-2" />
          {profile.recordDesc && (
            <div
              className="whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: profile.recordDesc.replace(/<@profile\.key>|<\/?>/g, "") }}
            />
          )}
        </div>
      ))}
    </div>
  )
}