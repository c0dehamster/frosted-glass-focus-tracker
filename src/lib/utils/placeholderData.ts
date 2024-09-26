import type { Task } from "$lib/types/task"

export const placeholderData: Array<Task> = [
    {
        id: "task1",
        name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut lorem sodales, gravida purus laoreet, volutpat turpis. Donec nisi mauris, facilisis vitae massa vel, sodales egestas mauris. Donec dictum arcu id sem rutrum, a vestibulum ante sollicitudin. Donec molestie magna eu velit sollicitudin accumsan. Donec non egestas metus. Curabitur sed nisi enim.",
        status: "active",
    },
    {
        id: "task2",
        name: "Nunc pretium risus elit, et facilisis dui tempor id",
        description:
            "Donec ornare odio nec turpis placerat, in commodo sapien sagittis. Ut condimentum neque ac lacus fringilla, et suscipit dolor egestas. Sed commodo, ex sollicitudin molestie porttitor, risus turpis rhoncus mi, gravida lacinia diam erat vel nunc. Maecenas hendrerit pharetra ligula, nec auctor ex. Nulla vitae molestie turpis, id tincidunt odio. Sed vitae vestibulum elit. Phasellus felis tortor, mollis sed vulputate a, tincidunt sed odio.",
        status: "active",
    },
    {
        id: "task3",
        name: "Suspendisse id mauris ligula. Nunc hendrerit ex felis",
        description:
            "Fusce eget lacus sed lectus imperdiet pulvinar sed vel magna. Etiam accumsan velit justo. Vestibulum volutpat mi sit amet dolor hendrerit ullamcorper. Vivamus rhoncus et ante et iaculis. Nam eget arcu dolor. Cras ultrices.",
        status: "completed",
    },
]
