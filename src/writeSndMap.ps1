# Define the directory to map and the output JSON file
$directoryPath = ".\snd"   # Replace with your relative directory path
$outputJsonFile = ".\sndMap.json"  # Replace with your desired output file path

# Function to recursively map the directory structure
function Get-DirectoryStructure {
    param (
        [string]$path
    )

    $structure = @{}

    $items = Get-ChildItem -Path $path

    foreach ($item in $items) {
        if ($item.PSIsContainer) {
            # It's a directory
            $structure[$item.Name] = Get-DirectoryStructure -path $item.FullName
        } else {
            # It's a file
            $structure[$item.Name] = $item.FullName
        }
    }

    return $structure
}

# Get the directory structure as a hashtable
$directoryStructure = Get-DirectoryStructure -path $directoryPath

# Convert the hashtable to JSON
$json = $directoryStructure | ConvertTo-Json -Depth 100

# Write the JSON to the output file
Set-Content -Path $outputJsonFile -Value $json

Write-Output "Directory structure has been written to $outputJsonFile"